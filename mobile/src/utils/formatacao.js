export function formatarNota(nota) {
  if (!nota) {
    return "Sem nota"
  }

  return (
    `★ ${Number(nota).toFixed(1).replace(".", ",")}`
  )
}

export function formatarDuracao(duracao) {
  if (duracao === null || duracao === undefined) {
    return null
  }
  const horas = Math.floor(duracao / 60)
  const minutos = duracao % 60

  if (horas === 0) return `${minutos}min`
  if (minutos === 0) return `${horas}h`
  return `${horas}h ${minutos}min`
}