"use client";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
const site_email = process.env.NEXT_PUBLIC_site_email;

export default function Contact() {
  const [owner, setOwner] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const webBaseUrl = process.env.NEXT_PUBLIC_WEB_BASE_URL || "";

    const response = await fetch(`${webBaseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ owner, title, body }),
    });

    await response.json();
    if (response.ok) {
      setIsSubmitted(true);
      setTitle(""); // Reset fields
      setBody("");
      setOwner("");
    }
  };

  return (
    <main className="prose mx-auto py-8 px-2">
      <Breadcrumb items={[{ label: "CONTACT US", href: `` }]} />
      <h1 className="text-3xl font-bold custom-gradient-a">CONTACT US</h1>
      <p>
        Have questions, suggestions, or corrections? We’d love to hear from you.
      </p>
      <ul className="list-inside list-disc">
        <li>
          Email: <a href={`mailto:${site_email}`}>{site_email}</a>
        </li>
      </ul>
      <p>
        Expect a response within 48 hours. For urgent DMCA takedown requests,
        see our <a href="/terms">Terms of Service</a>.
      </p>
      <div className="max-w-3xl mx-auto p-2">
        <div className="max-w-2xl mx-auto w-full p-3 bg-slate-700 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Your email (Optional):
              </label>
              <input
                aria-label="Email"
                type="email"
                className="w-full p-1 border border-gray-600 rounded bg-gray-900"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Title:</label>
              <input
                aria-label="Title"
                type="text"
                className="w-full p-1 border border-gray-600 rounded bg-gray-900"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Body:</label>
              <textarea
                aria-label="Context"
                className="w-full h-40 p-1 border border-gray-600 rounded bg-gray-900"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="block mx-auto font-bold hover:bg-teal-600 bg-teal-800 text-white text-center py-2 px-4 rounded"
            >
              SEND
            </button>
          </form>
        </div>

        {/* Success Popup Modal */}
        {isSubmitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Message Sent!</h2>
              <p className="text-gray-300 mb-4">
                We have received your message.
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded"
                onClick={() => setIsSubmitted(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
