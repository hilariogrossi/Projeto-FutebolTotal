export default function Data({ partidas }) {
    const captalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return partidas.slice(0, 1).map(partida => {
      const dataJogo = new Date(partida.data_jogo);
      const dia = dataJogo.getDate();
      const mes = captalize(
        dataJogo.toLocaleString('pt-BR', { month: 'long' })
      );
      const hora = dataJogo.getHours();
      const minutos = dataJogo.getMinutes();

      const formatoDia = dia < 10 ? 0${dia} : dia;
      const formatoHora = hora < 10 ? 0${hora} : hora;
      const formatoMinutos = minutos < 10 ? 0${minutos} : minutos;

      const dataFormatada = ${formatoDia} de ${mes} às ${formatoHora}:${formatoMinutos};

      return (
        <div key={partida.id}>
          {dataFormatada}
        </div>
      );
    });
  }