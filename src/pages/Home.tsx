import { lazy, Suspense } from "react";
import MainContainer from "../components/MainContainer";
import { LoadingProvider } from "../context/LoadingProvider";

const CharacterModel = lazy(() => import("../components/Character"));

const Home = () => {
  return (
    <LoadingProvider>
      <MainContainer>
        <Suspense fallback={null}>
          <CharacterModel />
        </Suspense>
      </MainContainer>
    </LoadingProvider>
  );
};

export default Home;
