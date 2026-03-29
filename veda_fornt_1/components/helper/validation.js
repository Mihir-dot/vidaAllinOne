// Validation function
export const validateContactForm = (formData) => {
  const errors = {};

  if (formData.username.trim() === "") {
    errors.username = "Please enter your name";
  } else if (/^\d+$/.test(formData.username.trim())) {
    errors.username = "Username cannot consist of only digits";
  }

  if (formData.email.trim() === "") {
    errors.email = "Please enter your email";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (!formData.subject.trim()) {
    errors.subject = "Please enter a subject.";
  } else if (formData.subject.trim() === "") {
    errors.subject = "Subject cannot be whitespace only.";
  }

  if (!formData.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (formData.message.trim().length < 30) {
    errors.message = "Message must be at least 30 characters long.";
  }

  return errors;
};

export const validateCommentForm = (formData) => {
  const errors = {};

  if (formData.name.trim() === "") {
    errors.name = "Please enter your name";
  } else if (/^\d+$/.test(formData.name.trim())) {
    errors.name = "Username cannot consist of only digits";
  }

  if (formData.email.trim() === "") {
    errors.email = "Please enter your email";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (formData.message.trim().length < 30) {
    errors.message = "Message must be at least 30 characters long.";
  }

  return errors;
};

export const validateFaqContactForm = (formData) => {
  const errors = {};

  if (formData.name.trim() === "") {
    errors.name = "Please enter your name";
  } else if (/^\d+$/.test(formData.name.trim())) {
    errors.name = "Username cannot consist of only digits";
  }

  if (formData.email.trim() === "") {
    errors.email = "Please enter your email";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }
  if (!formData.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (formData.message.trim().length < 30) {
    errors.message = "Message must be at least 30 characters long.";
  }

  return errors;
};

export const validateFeedbackForm = (formData) => {
  const errors = {};

  if (formData.name.trim() === "") {
    errors.name = "Please enter your name";
  } else if (/^\d+$/.test(formData.name.trim())) {
    errors.name = "Username cannot consist of only digits";
  }

  if (formData.email.trim() === "") {
    errors.email = "Please enter your email";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  return errors;
};