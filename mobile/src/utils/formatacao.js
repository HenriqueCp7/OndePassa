export default function formataNota(nota) {

    if(!nota) {
        return "Sem nota"
    }

  return (
        `★ ${Number(nota).toFixed(1).replace(".",",")}`
  )
}