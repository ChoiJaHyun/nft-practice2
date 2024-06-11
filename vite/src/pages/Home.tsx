import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";

const imageUrls = [
  "/images/cherry.jpg",
  "/images/perfume.jpg",
  "/images/basic.jpg",
  "/images/classic.jpg",
  "/images/earth.jpg",
  "/images/icebar.jpg",
  "/images/icecube.jpg",
  "/images/lightbulb.jpg",
  "/images/capsule.jpg",
];

const generateRandomPositions = (
  numImages: number,
  containerWidth: number,
  containerHeight: number
) => {
  const positions = [];
  const size = 200;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const radius = Math.min(containerWidth, containerHeight) / 3;

  for (let i = 0; i < numImages; i++) {
    let overlap;
    let position;
    do {
      overlap = false;
      const angle = Math.random() * 2 * Math.PI;
      const distance = radius + Math.random() * radius;
      const top = centerY + distance * Math.sin(angle) - size / 2;
      const left = centerX + distance * Math.cos(angle) - size / 2;
      const transform = `rotate(${Math.random() * 360}deg)`;
      position = { top, left, transform };

      for (let j = 0; j < positions.length; j++) {
        const other = positions[j];
        const distX = Math.abs(left - other.left);
        const distY = Math.abs(top - other.top);
        if (distX < size && distY < size) {
          overlap = true;
          break;
        }
      }
    } while (overlap);
    positions.push(position);
  }
  return positions;
};

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<
    { top: number; left: number; transform: string }[]
  >([]);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      setPositions(
        generateRandomPositions(
          imageUrls.length,
          containerWidth,
          containerHeight
        )
      );
    }
  }, []);

  return (
    <Box
      ref={containerRef}
      position="relative"
      width="100vw"
      height="100vh"
      bg="rgba(255, 255, 255, 0.1)"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        src="/images/gold.jpg"
        alt="Slime World Background"
        position="absolute"
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex={-1}
      />
      <Text
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        fontSize="4xl"
        fontWeight="bold"
        color="white"
        textAlign="center"
        textShadow="2px 2px 4px rgba(0, 0, 0, 0.7)"
      >
        Welcome to Slime World
      </Text>
      {positions.length > 0 &&
        imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`image-${index + 1}`}
            position="absolute"
            width="200px"
            height="200px"
            borderRadius="md"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.2)"
            style={positions[index]}
            _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
          />
        ))}
      <Button
        position="absolute"
        bottom="20px"
        right="20px"
        borderRadius="50%"
        width="80px"
        height="80px"
        bg="yellow.500"
        color="white"
        boxShadow="0 0 20px rgba(0, 0, 0, 0.3)"
        _hover={{ bg: "white.400" }}
      >
        Purchase
      </Button>
    </Box>
  );
};

export default Home;
