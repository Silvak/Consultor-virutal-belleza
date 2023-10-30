import ImageUploader from "@/components/ImageUploader";
import JustifyContent from "@/components/JustifyContent";

//
export default function Page() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-100/10 px-4">
      <JustifyContent width={1200}>
        <ImageUploader />
      </JustifyContent>
    </section>
  );
}
