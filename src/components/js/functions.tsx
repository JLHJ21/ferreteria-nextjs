export const getMonday = (d: Date) => {
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}

export const getSunday = (d: Date) => {
    const day = d.getDay();  // 0 (domingo) a 6 (sábado)
    const diff = day === 0 ? 0 : 7 - day; // días para avanzar hasta domingo
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
}

const formatDatetimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export default formatDatetimeLocal;
