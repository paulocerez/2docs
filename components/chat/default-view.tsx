import LinkInputs from "./LinkInputs";

export default function DefaultView() {
  const handleLinkSubmit = (links: string[]) => {
    // Mutate links to backend here
    console.log("Submitted links:", links);
  };
  return (
    <div className="flex flex-col items-center py-8 space-y-8 w-full">
      <div className="mx-4 p-4 text-gray-700 leading-relaxed max-w-lg">
        Insert two or more links of the API Docs you want to include in your
        workflow. Specify the workflow with as much context and precision as
        possible in the prompt field.
      </div>
      <div className="w-full max-w-2xl">
        <LinkInputs onSubmit={handleLinkSubmit} />
      </div>
    </div>
  );
}
