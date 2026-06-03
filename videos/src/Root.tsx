import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { Onomastikon } from "./Onomastikon";
import { EgyptTitleCard } from "./EgyptTitleCard";
import { GreeceTitleCard } from "./GreeceTitleCard";
import { PersiaTitleCard } from "./PersiaTitleCard";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Onomastikon homepage wordmark — 8:3 masthead banner.
          Render: npx remotion render OnomastikonLogo ../public/onomastikon-logo.mp4 */}
      <Composition
        id="OnomastikonLogo"
        component={Onomastikon}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={720}
      />

      {/* Egypt entry title card — static endonym card (km.t, "the Black Land").
          Render: npx remotion still EgyptTitleCard ../public/egypt-title.png */}
      <Composition
        id="EgyptTitleCard"
        component={EgyptTitleCard}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={720}
      />

      {/* Greece entry title card — static endonym card (Ἑλλάς, "Hellas").
          Render: npx remotion still GreeceTitleCard ../public/greece-title.png */}
      <Composition
        id="GreeceTitleCard"
        component={GreeceTitleCard}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={720}
      />

      {/* Persia entry title card — static endonym card (Pārsa, the Achaemenid
          heartland). Render: npx remotion still PersiaTitleCard ../public/persia-title.png */}
      <Composition
        id="PersiaTitleCard"
        component={PersiaTitleCard}
        durationInFrames={1}
        fps={30}
        width={1920}
        height={720}
      />

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
