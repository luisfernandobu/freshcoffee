import useQuiosco from "@/hooks/useQuiosco"

export default function Categoria({ categoria }) {

  const { handleClickCategoria, categoriaActual } = useQuiosco()
  const { icono, id, nombre } = categoria

  return (
    <div
      className={`${(id === categoriaActual.id) ? 'bg-amber-400' : 'bg-white'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <img
        src={`/img/icono_${icono}.svg`}
        alt={`Icono ${nombre}`}
        className="w-12"
      />

      <button
        className="text-lg font-bold truncate"
        type="button"
      >
        {nombre}
      </button>
    </div>
  )
}
