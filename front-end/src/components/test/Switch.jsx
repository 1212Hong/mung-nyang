import { motion, AnimatePresence } from "framer-motion";
import {
    CameraIconWrapper,
    CameraIcon,
    CameraOffIcon,
} from "../../components/layout/connectionTest";

const Switch = ({ isOn, onToggle }) => {
    return (
        <motion.div layout onClick={onToggle}>
            <AnimatePresence initial={false} mode="wait">
                <CameraIconWrapper>
                    {isOn ? (
                        <CameraIcon width="100" height="100" />
                    ) : (
                        <CameraOffIcon width="100" height="100" />
                    )}
                </CameraIconWrapper>
            </AnimatePresence>
        </motion.div>
    );
};

export default Switch;
