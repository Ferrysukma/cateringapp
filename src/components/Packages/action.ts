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

export async function submitInformation(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const slug = formData.get("slug");
  const started_at = formData.get("started_at");
  const catering_package_id = formData.get("catering_package_id");
  const catering_tier_id = formData.get("catering_tier_id");

  if (name === "") {
    return {
      message: "Nama tidak boleh kosong",
      field: "name",
    };
  }
  if (phone === "") {
    return {
      message: "Nomor telepon tidak boleh kosong",
      field: "phone",
    };
  }
  if (email === "") {
    return {
      message: "Email tidak boleh kosong",
      field: "email",
    };
  }
  if (started_at === "") {
    return {
      message: "Tanggal tidak boleh kosong",
      field: "started_at",
    };
  }

  return {
    message: "Next Step",
    field: "",
    data: {
      name,
      phone,
      email,
      started_at,
      catering_package_id,
      catering_tier_id,
      slug,
    },
  };
}
