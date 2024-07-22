import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@nextui-org/image";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section
        className="flex flex-col items-center justify-center"
      >
        <div className="max-w-lg text-center justify-center">
          <h1 className={title()}>About</h1>
        </div>
        <div>
          <Image
            className="text-center justify-center"
            width={500}
            alt="Image"
            src="https://i.ibb.co/2y0Z81s/about-img.jpg"
          />
        </div>
        <div>
          <h2 className="text-center justify-center p-5">
          Our mission is to make every day more fun in the kitchen, because we believe cooking is the key to a happier and healthier life for people, communities, and the planet.
          We want to support home chefs around the world so they can help each other by sharing their delicious dishes and cooking tips.
          </h2>
        </div>

        <div className="text-center justify-center">
          <span>
            <h1 className={title()}>Give Your Feedbacks</h1>
          </span>
          <Image className="justify-center pt-5" alt="contract-image" src="https://i.ibb.co/3R0GWmN/contact-image.png"/>
        </div>
      </section>
    </DefaultLayout>
  );
}
