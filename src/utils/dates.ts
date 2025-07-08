export function parseDateToISO(dateStr: string): string {
    if (!dateStr) return "";

    const parts = dateStr.split("/");
    if (parts.length !== 3) return "";

    // dd/mm/yyyy
    const [dd, mm, yyyy] = parts;
    const isoStr = `${yyyy}-${mm}-${dd}`; // 2023-03-15

    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return "";

    return d.toISOString().substring(0, 10);
}