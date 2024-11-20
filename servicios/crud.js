const apiUrl = "http://localhost:3000/crud";

export async function createCrud(
  nombre,
  apellido,
  edad,
  sexo,
  fecha_nacimiento
) {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        NOMBRE: nombre,
        APELLIDO: apellido,
        EDAD: edad,
        SEXO: sexo,
        FECHA_NACIMIENTO: fecha_nacimiento,
      }),
    });
    console.log(response);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
}
export async function getCrud() {
  try {
    const response = await fetch(apiUrl);
    const results = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCrudAsync(id) {
  try {
    const response = await fetch(apiUrl + "/" + id, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}
