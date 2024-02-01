import fetch from "node-fetch";
import { CompareFacesCommand } from "@aws-sdk/client-rekognition";

import { rekognition } from "../config/awsRekognition.js";

const thereIsFaceMatches = async (userImage: string, image2: string) => {
  const response = await fetch(userImage);
  const imageBuffer = await response.arrayBuffer();
  const imageBytes = new Uint8Array(imageBuffer);

  const response2 = await fetch(image2);
  const imageBuffer2 = await response2.arrayBuffer();
  const imageBytes2 = new Uint8Array(imageBuffer2);

  // CompareFacesRequest
  const inputParams = {
    SourceImage: {
      Bytes: imageBytes,
    },
    TargetImage: {
      Bytes: imageBytes2,
    },
    SimilarityThreshold: 80,
  };

  // Realiza la comparación de rostros
  const command = new CompareFacesCommand(inputParams);
  const result = await rekognition.send(command);

  // Verificar los resultados
  if (result.FaceMatches && result.FaceMatches.length > 0) {
    // Se encontraron rostros similares
    console.log("El rostro de la imagen1 esta presente en la imagen2");
    return true;
  } else {
    // No se encontraron rostros similares
    console.log("El rostro de la imagen1 NO esta presente en la imagen2.");
    return false;
  }
};

export { thereIsFaceMatches };
