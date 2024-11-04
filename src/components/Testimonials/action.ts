export async function getAllTestimonials() {
  try {
    const res = await fetch(`${process.env.HOST_API}/testimonials`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}
