import React from "react";
import Faq from "./faq";
import TitleWhisper from "./ui/title-whisper";

export default function FaqSection() {
  return (
    <div className=" max-w-[500px]   w-full flex flex-col items-center sticky top-0  mx-auto ">
      <TitleWhisper />
      <div className="hidden lg:block w-full ">
        <Faq summary={"¿Qué es Whisper?"}>
          Whisper es un espacio en el que los usuarios pueden buscar
          relacionarse e interactuar con personas de todo el mundo.
        </Faq>
        <Faq summary={"Cual es nuestro objetivo general?"}>
          Whisper tiene como objetivo el crear un entorno fácil e intuitivo en
          el que puedan comunicarse sin problema alguno. Ofrecer una interfaz
          intuitiva y fácil de usar que permita a los usuarios de todas las
          edades y niveles de experiencia en tecnología aprovechar al máximo la
          plataforma sin confusión ni complicaciones innecesarias.
        </Faq>
        <Faq summary={"¿Cómo puedo configurar mi perfil en Whisper?"}>
          Configurar tu perfil en Whisper es fácil y te permite personalizar tu
          experiencia en la plataforma. Puedes agregar una foto de perfil,
          escribir una breve descripción sobre ti y mucho más.
        </Faq>
      </div>
    </div>
  );
}
