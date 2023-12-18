import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";

const luoLaskutehtava = (kertotaulu: number) => {
  const kerroin = Math.round(Math.random() * 10);
  return { kertotaulu, kerroin, oikeaVastaus: kertotaulu * kerroin };
};

function Matikkapeli() {
  const [laskutehtava, asetaLakutehtava] = useState(luoLaskutehtava(2));
  const [vastaus, asetaVastaus] = useState<string>("");
  const [naytaVastaus, asetaNaytaVastaus] = useState<boolean>(false);
  const [onkoVastausOikein, asetaOnkoVastausOikein] = useState<boolean>(false);

  const vastausRef = useRef<HTMLInputElement>(null);
  const seuraavaTehtavaRef = useRef<HTMLButtonElement>(null);

  const luoUusiTehtava = () => {
    asetaLakutehtava(luoLaskutehtava(2));
    asetaVastaus("");
    asetaOnkoVastausOikein(false);
    asetaNaytaVastaus(false);
    vastausRef.current?.focus();
  };

  const tarkistaTehtava = () => {
    if (vastaus) {
      const vastausOnOikein = Number(vastaus) === laskutehtava.oikeaVastaus;
      asetaOnkoVastausOikein(vastausOnOikein);
      asetaNaytaVastaus(true);

      if (vastausOnOikein) {
        seuraavaTehtavaRef.current?.focus();
      }
    }
  };

  const { kertotaulu, kerroin } = laskutehtava;

  return (
    <div>
      <h1>Matikkapeli</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          tarkistaTehtava();
        }}
      >
        <p>Tehtävä:</p>
        <p>
          {kertotaulu} x {kerroin}
        </p>
        <p>Vastaus:</p>
        <div>
          <input
            type="number"
            ref={vastausRef}
            value={vastaus}
            onChange={(e) => asetaVastaus(e.target.value)}
          />
        </div>
        <p>
          Tulos:{" "}
          {naytaVastaus &&
            (onkoVastausOikein ? (
              <span style={{ color: "green" }}>Oikein!</span>
            ) : (
              <span style={{ color: "red" }}>Väärin!</span>
            ))}
        </p>
        <div>
          <button type="submit" onClick={() => tarkistaTehtava()}>
            Tarkista tulos
          </button>
          <button ref={seuraavaTehtavaRef} onClick={() => luoUusiTehtava()}>
            Seuraava tehtävä
          </button>
        </div>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Matikkapeli />
  </React.StrictMode>
);
