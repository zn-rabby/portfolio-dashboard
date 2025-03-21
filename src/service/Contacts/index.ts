// export const getAllContacts = async (page?: string, limit?: string) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API}/contacts?limit=${limit}&page=${page}`,
//         {
//           next: {
//             tags: ["PRODUCT"],
//           },
//         }
//       );
//       const data = await res.json();
//     //   console.log("data",data.data)
//       return data;
//     } catch (error: any) {
//       return Error(error.message);
//     }
//   };

export const getAllContacts = async (page?: string, limit?: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/contacts?limit=${limit}&page=${page}`,
        {
          next: {
            tags: ["CONTACTS"], // Use a unique tag
          },
        }
      );
      const data = await res.json();
      console.log("Fetched Data:", data); // Log the data to verify its structure
      return data;
    } catch (error: any) {
      throw new Error(error.message); // Throw error instead of returning it
    }
  };