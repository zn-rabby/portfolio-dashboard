// // app/contact/page.tsx (or any Server Component file)
// import ContactTable from "@/components/modules/Contact/ContactTable";
// import { getAllContacts } from "@/service/Contacts";
// import { Contact } from "@/types/user";

// export default async function ContactPage() {
//   // Fetch data on the server
//   const { contacts } = await getAllContacts();
   

//   return (
//     <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//       <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
//         Contact Details
//       </h2>
//       {/* Pass the fetched data to the Client Component */}
//       <ContactTable contact={contacts} />
//     </div>
//   );
// }

import ContactTable from "@/components/modules/Contact/ContactTable";
import { getAllContacts } from "@/service/Contacts";
import { Contact } from "@/types/user";

export default async function ContactPage() {
  // Fetch data on the server
  const data = await getAllContacts();

  // Access the `data` key from the API response
  const contacts: Contact[] = data.data || [];

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Contact Details
      </h2>
      {/* Pass the fetched data to the Client Component */}
      <ContactTable contact={contacts} />
    </div>
  );
}