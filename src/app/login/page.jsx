"use client";

export default function LoginPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    // TODO: Send the form data to the server
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    //hashing password
    const hashedPassword = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    const base64 = btoa(String.fromCharCode(...new Uint8Array(hashedPassword)));

    // decrypting password
    // const decryptedPassword = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
    // const base64 = btoa(String.fromCharCode(...new Uint8Array(decryptedPassword)));
    // console.log(base64);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // TODO: Send the username and password to the server
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {

    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}
