export async function getAllPackages() {
  try {
    const res = await fetch(`${process.env.HOST_API}/catering-packages`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}