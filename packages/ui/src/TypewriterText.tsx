import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  enabled: boolean;
  onComplete?: () => void;
  className?: string;
  isHtml?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  enabled,
  onComplete,
  className = '',
  isHtml = false
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(!enabled);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const plainText = isHtml ? text.replace(/<[^>]*>/g, '') : text;

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        if (prevIndex >= plainText.length - 1) {
          clearInterval(intervalId);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 50);

    return () => clearInterval(intervalId);
  }, [enabled, plainText]);

  useEffect(() => {
    setDisplayText(plainText.slice(0, currentIndex + 1));
  }, [currentIndex, plainText]);

  const handleClick = () => {
    if (!isComplete) {
      setDisplayText(text);
      setIsComplete(true);
      onComplete?.();
    }
  };

  return (
    <div 
      className={`${className} ${!isComplete ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {isHtml ? (
        <div dangerouslySetInnerHTML={{ __html: displayText }} />
      ) : (
        displayText
      )}
    </div>
  );
}; 