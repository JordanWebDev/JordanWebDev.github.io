/**
 * App.tsx - Root Application Component
 * 
 * Handles the boot sequence → main dashboard transition using React Context.
 * The BootSequenceProvider wraps the entire app to manage state transitions.
 */
import { useCallback, Component, type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Contexts
import { BootSequenceProvider, useBootSequence, BootPhase } from './contexts';

// Components
import XboxBootAnimation from './components/XboxBootAnimation';
import HexagonalBackground from './components/HexagonalBackground';
import Navigation from './components/Navigation';

// Views/Pages
import Home from './pages/Home';
import Works from './pages/Works';
import Bio from './pages/Bio';
import Interests from './pages/Interests';
import Experience from './pages/Experience';
import Blog from './pages/Blog';

// ============================================
// BOOT SEQUENCE COMPONENT
// ============================================

/**
 * BootSequenceView
 * Renders the boot animation and handles transition to main app
 */
function BootSequenceView(): JSX.Element {
    const { state, onUserStart, completeBoot } = useBootSequence();

    /**
     * Handler for when user clicks "Start"
     * Triggers transition animation then completes boot
     */
    const handleStartPressed = useCallback((): void => {
        onUserStart();
        // Small delay for transition animation
        setTimeout(() => {
            completeBoot();
        }, 500);
    }, [onUserStart, completeBoot]);

    return (
        <XboxBootAnimation onComplete={handleStartPressed} />
    );
}

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

/**
 * MainDashboard
 * The main application with navigation and routing
 */
/**
 * AnimatedRoutes
 * Wraps Routes in AnimatePresence for page transitions
 * Must be rendered INSIDE a Router context
 */
function AnimatedRoutes(): JSX.Element {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<Works />} />
                <Route path="/bio" element={<Bio />} />
                <Route path="/interests" element={<Interests />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/blog" element={<Blog />} />
            </Routes>
        </AnimatePresence>
    );
}

/**
 * MainDashboard
 * The main application with navigation and routing
 */
function MainDashboard(): JSX.Element {
    console.log('[Debug] MainDashboard Mounting');
    return (
        <div className="relative min-h-screen bg-xbox-dark text-xbox-light border-4 border-red-500">
            {/* Navigation */}
            <Navigation />

            {/* Page Content with Animations */}
            <AnimatedRoutes />
        </div>
    );
}



// ============================================
// APP CONTENT (CONSUMES BOOT CONTEXT)
// ============================================

/**
 * AppContent
 * Switches between boot sequence and main dashboard based on context state
 */
function AppContent(): JSX.Element {
    const { state } = useBootSequence();
    console.log('[Debug] AppContent rendering. Boot complete:', state.isComplete);

    // Show boot sequence if not complete
    if (!state.isComplete) {
        console.log('[Debug] Rendering BootSequenceView');
        return <BootSequenceView />;
    }

    // Show main application
    console.log('[Debug] Rendering MainDashboard');
    return <MainDashboard />;
}

// ============================================
// ROOT APP COMPONENT
// ============================================

// Basic Error Boundary to catch render crashes
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-red-500 p-10 font-mono">
                    <h1 className="text-3xl mb-4">CRITICAL SYSTEM FAILURE</h1>
                    <pre className="bg-gray-900 p-4 rounded border border-red-900 overflow-auto">
                        {this.state.error?.toString()}
                    </pre>
                </div>
            );
        }
        return this.props.children;
    }
}

/**
 * App
 * Root component that wraps everything in the BootSequenceProvider
 * 
 * @param skipBootOnRevisit - If true, skips boot animation on repeat visits (uses sessionStorage)
 */
/**
 * App
 * Root component that wraps everything in the BootSequenceProvider
 * 
 * @param skipBootOnRevisit - If true, skips boot animation on repeat visits (uses sessionStorage)
 */
function App(): JSX.Element {
    return (
        <ErrorBoundary>
            <Router>
                <BootSequenceProvider skipBootOnRevisit={false}>
                    <AppContent />
                </BootSequenceProvider>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
