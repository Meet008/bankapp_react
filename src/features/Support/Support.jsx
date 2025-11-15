import { useState } from "react";

export default function SupportHelp() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleChatSubmit = () => {
    if (!input.trim()) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thank you for your message! Our team will respond shortly.",
        },
      ]);
    }, 800);

    setInput("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Support & Help</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">
            Frequently Asked Questions
          </h2>

          <details className="mb-3">
            <summary className="font-medium cursor-pointer">
              How can I reset my password?
            </summary>
            <p className="mt-2 text-gray-600">
              Go to Settings ➝ Change Password and follow the steps.
            </p>
          </details>

          <details className="mb-3">
            <summary className="font-medium cursor-pointer">
              How do I update my phone number?
            </summary>
            <p className="mt-2 text-gray-600">
              You can update your phone number in Profile ➝ Personal
              Information.
            </p>
          </details>

          <details className="mb-3">
            <summary className="font-medium cursor-pointer">
              Why is my account locked?
            </summary>
            <p className="mt-2 text-gray-600">
              Too many login attempts. Try again after 24 hours or contact
              support.
            </p>
          </details>

          <details className="mb-3">
            <summary className="font-medium cursor-pointer">
              How can I download transaction reports?
            </summary>
            <p className="mt-2 text-gray-600">
              Go to Analytics ➝ Monthly Reports ➝ Download PDF / Excel.
            </p>
          </details>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Contact Support</h2>

          <div className="mb-4">
            <label className="text-sm font-medium">Your Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 mt-1 border rounded-lg"
              placeholder="john@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Message</label>
            <textarea
              className="w-full p-2 mt-1 border rounded-lg h-24"
              placeholder="Describe your issue..."
            ></textarea>
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Submit Ticket
          </button>
        </div>
      </div>

      {/* Chatbot (Mock) */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-md lg:w-1/2">
        <h2 className="text-lg font-semibold mb-4">Chatbot Assistant (Mock)</h2>

        <div className="h-60 overflow-y-auto border rounded-lg p-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 p-2 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex mt-3">
          <input
            type="text"
            className="flex-1 border p-2 rounded-lg"
            placeholder="Type your message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleChatSubmit}
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
