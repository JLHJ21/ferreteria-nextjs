"use client";

import { createTheme } from "react-data-table-component";

export const customDesign = () => {
    createTheme(
        'black',
        {
            text: {
                primary: '#FFFFFF', // texto principal
                secondary: '#CCCCCC', // texto secundario
            },
            background: {
                default: '#1e1e1e', // fondo de la tabla
            },
            context: {
                background: '#007bff', // color de contexto (si usas filas seleccionadas)
                text: '#FFFFFF',
            },
            divider: {
                default: '#333333', // líneas divisorias
            },
            button: {
                default: '#007bff', // color de botones (Modificar)
                hover: 'rgba(0, 123, 255, 0.1)',
                focus: 'rgba(0, 123, 255, 0.2)',
                disabled: 'rgba(255, 255, 255, 0.3)',
            },
            sortFocus: {
                default: '#007bff', // color al ordenar
            },
            highlightOnHoverStyle: {
                backgroundColor: '#2a2a2a', // color de fila al hacer hover
                borderBottomColor: '#444444',
                borderRadius: '0px',
                outline: 'none',
            },
        },
        'dark'
    );

}
