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

export async function getPackageFiltered(categorySlug: string, citySlug: string) {
  try {
    const res = await fetch(`${process.env.HOST_API}/filter/catering-packages?category_slug=${categorySlug}&city_slug=${citySlug}`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function getPackageDetail(packageSlug: string) {
  try {
    const res = await fetch(`${process.env.HOST_API}/catering-package/${packageSlug}`, {
      method: "GET",
      cache: "no-cache",
    });
    return res.json();
  } catch (error) {
    return error;
  }
}
