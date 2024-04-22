import AuthForm from "@/components/AuthForm";

export default function Home() {
  return (
    <main className="flex items-center justify-center bg-gray-900 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Welcome to Photo App
        </h2>
        <p className="mb-6 text-lg text-center">
          Sign in to upload and save your favorite photos.
        </p>
        <AuthForm />
      </div>
    </main>
  );
}
