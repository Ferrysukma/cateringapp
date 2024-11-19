"use server";

interface File {
  size: number;
  type: string;
  name: string;
  lastModified: number;
}

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

export async function submitShippment(prevState: any, formData: FormData) {
  const address = formData.get("address");
  const post_code = formData.get("post_code");
  const slug = formData.get("slug");
  const notes = formData.get("notes");
  const tierId = formData.get("tierId");

  if (address === "") {
    return {
      message: "Alamat tidak boleh kosong",
      field: "address",
    };
  }
  if (post_code === "") {
    return {
      message: "Kode Pos tidak boleh kosong",
      field: "post_code",
    };
  }

  return {
    message: "Next Step",
    field: "",
    data: {
      address,
      post_code,
      slug,
      notes,
      tierId,
    },
  };
}

export async function submitPayment(prevState: any, formData: FormData) {
  const proof = formData.get("proof") as File;
  const slug = formData.get("slug") as string;
  const phone = formData.get("phone");

  if (proof.size === 0) {
    return {
      message: "Bukti Bayar tidak boleh kosong",
      field: "proof",
    };
  }

  try {
    const res = await fetch(`${process.env.HOST_API}/booking-transaction`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return {
      message: "Next Step",
      field: "",
      data: {
        slug,
        phone,
        booking_trx_id: data.data.booking_trx_id,
      },
    };
  } catch (error: any) {
    return {
      message: error.message,
      field: "toaster",
    };
  }
}

export async function detailBooking(phone: string, trxId: string) {
  const formData = new FormData();
  formData.append("phone", phone);
  formData.append("booking_trx_id", trxId);
  try {
    const res = await fetch(`${process.env.HOST_API}/check-booking`, {
      method: "POST",
      body: formData,
    });
    return res.json();
  } catch (error) {
    return error;
  }
}
