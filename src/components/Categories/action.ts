import { redirect } from "next/navigation";

export async function getAllCategories() {
  try {
    const res = await fetch(`${process.env.HOST_API}/categories`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function getDetailCategory(slug: string) {
  try {
    const res = await fetch(`${process.env.HOST_API}/category/${slug}`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function navigateFilterCategories(prevState: any, formData: FormData) {
  const category = formData.get("category");
  const city = formData.get("city");

  if (category === "") {
    return {
      message: "Pilih Kategory",
      field: "category",
    };
  }
  if (city === "") {
    return {
      message: "Pilih Kota",
      field: "city",
    };
  }

  return redirect(`/categories/${category}?citySlug=${city}`);
}
