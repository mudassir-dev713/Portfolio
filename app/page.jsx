import { Suspense, lazy } from 'react';
import Nav, { FloatingNav } from './components/Nav';
import { navItems } from './constants/Data';
import ErrorBoundary from './components/ErrorBoundary';
import LazyComponent from './components/LazyComponent';

// Lazy load components with proper error handling
const Hero = lazy(() => import('./components/Hero'), {
  ssr: true,
});
const Grid = lazy(() => import('./components/Grid'), {
  ssr: true,
});
const Projects = lazy(() => import('./components/Projects'), {
  ssr: true,
});
const Approuch = lazy(() => import('./components/Approuch'), {
  ssr: true,
});
const Contact = lazy(() => import('./components/Contact'), {
  ssr: true,
});

// Loading component that doesn't interfere with animations
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

export default function Home() {
  return (
    <main className="w-screen relative flex flex-col items-center justify-center mx-auto sm:px-10 px-5 dark:bg-black-100 bg-white">
      <div className="max-[1700px]:max-w-7xl w-full">
        <FloatingNav navItems={navItems} />

        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Hero />
          </Suspense>
        </ErrorBoundary>

        <div className="min-h-fit">
          <ErrorBoundary>
            <LazyComponent
              fallback={<LoadingSpinner />}
              threshold={0.1}
              rootMargin="100px"
            >
              <Grid />
            </LazyComponent>
          </ErrorBoundary>
        </div>

        <div className="min-h-fit">
          <ErrorBoundary>
            <LazyComponent
              fallback={<LoadingSpinner />}
              threshold={0.1}
              rootMargin="100px"
            >
              <Projects />
            </LazyComponent>
          </ErrorBoundary>
        </div>

        <div className="min-h-fit">
          <ErrorBoundary>
            <LazyComponent
              fallback={<LoadingSpinner />}
              threshold={0.1}
              rootMargin="100px"
            >
              <Approuch />
            </LazyComponent>
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <LazyComponent
            fallback={<LoadingSpinner />}
            threshold={0.1}
            rootMargin="100px"
          >
            <Contact />
          </LazyComponent>
        </ErrorBoundary>
      </div>
    </main>
  );
}
