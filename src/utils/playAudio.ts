export const playNotificationSound = (path: string) => {
  try {
    const audio = new Audio(path);
    audio.play().catch((error) => {
      console.error('Failed to play notification sound:', error);
    });
  } catch (error) {
    console.error('Error creating audio:', error);
  }
};