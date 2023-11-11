"use server"
import axios from "@/services/axios"
import { Login, Register, userData, Response, GetStudents, PostStudents, DeleteStudents } from "./types"
import { User } from "@/interface/User"
import { revalidatePath } from "next/cache"
import setCookies from "@/helpers/setCokies"

// Users
export const getUserData: userData = async () => {
  let response: Response = {
    message: "",
    success: false,
  }
  try {
    const request = await axios.get("/user")
    if (request.status === 403) {
      throw new Error("Unauthorized! You have to login to do that.")
    }
    if (request.status !== 200) {
      throw new Error("Error while trying to fetch user data.")
    }
    const data = request.data

    const user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      auth: true
    }
    response.success = true
    response.user = user
  } catch (error: any) {
    if (error.response && error.response.data) {
      response.message = error.response.data.error || "Unknown error occurred";
    } else {
      response.message = "Something went wrong";
    }
  }
  return response
}

export const login: Login = async (email, password) => {
  let response: Response = {
    message: "",
    success: false,
  };

  try {
    const request = await axios.post("/auth/login", { email, password });
    if (request.status === 200) {
      const token = request.data.token;
      if (!token) {
        throw new Error("No token received upon login");
      } else {
        response.success = true
        response.token = token
        axios.defaults.headers.Authorization = `Bearer ${token}`
        setCookies("true")
      }
    } else {
      throw new Error("Error while trying to log in");
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      response.message = error.response.data.error || "Unknown error occurred";
    } else {
      response.message = "Something went wrong";
    }
  }

  return response;
};




export const register: Register = async (user) => {
  let response: Response = {
    message: "",
    success: false,
  };

  try {
    const request = await axios.post("/auth/register", user);
    if (request.status === 200) {
      response.success = true;
      response.message = "User created successfully";
    } else {
      throw new Error("Error while trying to create user.");
    }
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errorMsg) {
      response.message = error.response.data.errorMsg;
    } else {
      response.message = "Something went wrong during user creation.";
    }
  }
  return response;
};


// Students

export const getAllStudents: GetStudents = async () => {
  let response: Response = {
    message: "",
    success: false
  }
  try {
    const request = await axios.get("/students")
    if (request.status === 403) {
      throw new Error("Unauthorized! You have to login to do that.")
    }
    if (request.status !== 200) {
      throw new Error("Error while trying to fetch student data.")
    }
    const data = request.data
    response.students = data
    response.success = true
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errorMsg) {
      response.message = error.response.data.errorMsg;
    } else if (error.message) {
      response.message = error.message;
    } else {
      response.message = "Something went wrong.";
    }
  }
  return response
}


export const createStudents: PostStudents = async (payload) => {
  let response: Response = {
    message: "",
    success: false
  }
  try {
    const request = await axios.post("/students", payload)
    if (request.status === 403) {
      throw new Error("Unauthorized! You have to login to do that!")
    }
    if (request.status !== 200) {
      throw new Error("Error while trying to create student record.")
    }
    response.success = true
    response.student = request.data
    revalidatePath("/dashboard")
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errorMsg) {
      response.message = error.response.data.errorMsg;
    } else if (error.message) {
      response.message = error.message;
    } else {
      response.message = "Something went wrong.";
    }
  }
  return response
}


export const editStudent: PostStudents = async (payload) => {
  let response: Response = {
    message: "",
    success: false
  }
  try {
    const request = await axios.put("/students", payload)
    if (request.status === 403) {
      throw new Error("Unauthorized! You have to login to do that!")
    }
    if (request.status !== 200) {
      throw new Error("Error while trying to update student record.")
    }
    response.success = true
    response.student = request.data
    revalidatePath("/dasboard")
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errorMsg) {
      response.message = error.response.data.errorMsg;
    } else if (error.message) {
      response.message = error.message;
    } else {
      response.message = "Something went wrong.";
    }
  }


  return response

}

export const deleteStudent: DeleteStudents = async (id) => {
  let response: Response = {
    message: "",
    success: false
  }

  try {
    const request = await axios.delete(`/students/${id}`)
    if (request.status === 403) {
      throw new Error("Unauthorized! You have to login to do that!")
    }
    if (request.status !== 200) {
      throw new Error("Error while trying to update student record.")
    }
    response.success = true
    revalidatePath("/dasboard")
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.errorMsg) {
      response.message = error.response.data.errorMsg;
    } else if (error.message) {
      response.message = error.message;
    } else {
      response.message = "Something went wrong.";
    }
  }

  return response
}

