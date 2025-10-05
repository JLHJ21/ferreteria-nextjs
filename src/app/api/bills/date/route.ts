import connectionPool from "../../../../../db";
import { haveData, wasDataSaved } from "../../templates/functions";


export const getBillsGraphics = async (request: Request) => {
    const { begin, end } = await request.json();

    if (!begin || !end) {
        return {
            ok: false,
            code: 400,
            information: "Some data required doesn't exist",
        };
    }

    const beginDate = new Date(begin);
    const endDate = new Date(end);
    const diffDays = Math.ceil(
        (endDate.getTime() - beginDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let query = "";
    let groupLabel = "";

    if (diffDays <= 7) {
        // 🟦 Agrupar por día de la semana (Lunes-Domingo)
        groupLabel = "día de la semana";
        query = `
      WITH dias AS (
          SELECT 0 AS dow, 'Domingo' AS month UNION ALL
          SELECT 1, 'Lunes' UNION ALL
          SELECT 2, 'Martes' UNION ALL
          SELECT 3, 'Miércoles' UNION ALL
          SELECT 4, 'Jueves' UNION ALL
          SELECT 5, 'Viernes' UNION ALL
          SELECT 6, 'Sábado'
      )
      SELECT 
          d.month,
          TO_CHAR(COALESCE(SUM(b.bill_money), 0), 'FM999G999G999G990D00') AS money
      FROM dias d
      LEFT JOIN bills b 
          ON EXTRACT(DOW FROM b.bill_date) = d.dow
         AND b.bill_date BETWEEN $1 AND $2
      GROUP BY d.dow, d.month
      ORDER BY d.dow;
    `;
    } else if (diffDays <= 31) {
        console.log('aqui')
        // 🟨 Agrupar por número de semana
        groupLabel = "semana";
        query = `
    WITH semanas AS (
      -- Generamos las fechas de inicio de semana dentro del rango de fechas
      SELECT 
        generate_series(
          -- Usamos el primer lunes después de la fecha de inicio
          (DATE_TRUNC('week', $1::DATE))::DATE,
          -- Usamos el último domingo de la fecha de fin
          (DATE_TRUNC('week', $2::DATE) + INTERVAL '6 days')::DATE,
          '1 week'::INTERVAL
        )::DATE AS week_start
    )
    SELECT 
        CONCAT(
          'Semana ',
          FLOOR((EXTRACT(DAY FROM s.week_start) - 1) / 7) + 1
        ) AS month,
        TO_CHAR(COALESCE(SUM(b.bill_money), 0), 'FM999G999G999G990D00') AS money
    FROM semanas s
    LEFT JOIN bills b 
        ON b.bill_date >= s.week_start
       AND b.bill_date < s.week_start + INTERVAL '1 week'
       AND b.bill_date BETWEEN $1 AND $2
    GROUP BY s.week_start
    ORDER BY s.week_start;
    `;
    } else if (diffDays <= 365) {
        // 🟩 Agrupar por mes
        groupLabel = "mes";
        query = `
      WITH meses AS (
        SELECT 
          generate_series(1, 12) AS mes_num,
          TO_CHAR(to_date(generate_series(1, 12)::text, 'MM'), 'TMMonth') AS month
      )
      SELECT 
          m.month,
          TO_CHAR(COALESCE(SUM(b.bill_money), 0), 'FM999G999G999G990D00') AS money
      FROM meses m
      LEFT JOIN bills b 
          ON EXTRACT(MONTH FROM b.bill_date) = m.mes_num
         AND b.bill_date BETWEEN $1 AND $2
      GROUP BY m.mes_num, m.month
      ORDER BY m.mes_num;
    `;
    } else {
        // 🟥 Agrupar por año
        groupLabel = "año";
        query = `
        WITH anios AS (
        SELECT generate_series(
            DATE_TRUNC('year', $1::DATE),  -- Primer día del año de la fecha de inicio
            DATE_TRUNC('year', $2::DATE) + INTERVAL '1 year' - INTERVAL '1 day',  -- Último día del año de la fecha de fin
            '1 year'::INTERVAL  -- Intervalo de un año
        )::DATE AS year_label
        )
        SELECT 
            TO_CHAR(a.year_label, 'YYYY') AS month,  -- Formateamos la fecha como 'YYYY' para obtener solo el año
            TO_CHAR(COALESCE(SUM(b.bill_money), 0), 'FM999G999G999G990D00') AS money
        FROM anios a
        LEFT JOIN bills b 
            ON EXTRACT(YEAR FROM b.bill_date) = EXTRACT(YEAR FROM a.year_label)
            AND b.bill_date BETWEEN $1 AND $2
        GROUP BY a.year_label
        ORDER BY a.year_label;
    `;
    }

    const dataBills = await connectionPool.query(query, [begin, end]);

    if (dataBills.rowCount === 0) {
        return {
            code: 401,
            information: `No se encontraron datos en el rango (${groupLabel}).`,
        };
    }


    return {
        code: 201,
        type: groupLabel,
        information: dataBills.rows,
    };
}

export async function POST(request: Request) {
    const data = await getBillsGraphics(request);
    try {
        return Response.json(
            {
                result: data.information,
                code: data.code,
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
