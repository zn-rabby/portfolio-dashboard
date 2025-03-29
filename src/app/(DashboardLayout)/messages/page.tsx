export const dynamic = "force-dynamic";

import ManageMessages from "@/components/modules/Contact";
// import ContactTable from "@/components/modules/Contact/ContactTable";
import { getAllContacts } from "@/service/Contacts";
import { IContact } from "@/types/user";

export default async function ContactPage() {
  // Fetch data on the server
  const data = await getAllContacts();

  // Access the `data` key from the API response
  const message: IContact[] = data.data || [];
  console.log(message, 55);

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Messages Details
      </h2>
      {/* Pass the fetched data to the Client Component */}
      {/* <ContactTable contact={contacts} /> */}
      <ManageMessages message={message}></ManageMessages>
    </div>
  );
}
