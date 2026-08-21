import { lazy, Suspense } from "react";
const CharacterModel = lazy(() => import("../components/Character"));
const MainContainer = lazy(() => import("../components/MainContainer"));
import { LoadingProvider } from "../context/LoadingProvider";

const Home = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <MainContainer>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

export default Home;
