export const contactFormFunction = async (previousState: string, formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  console.log(previousState, name, email, message);

  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return "Form submitted successfully";
};