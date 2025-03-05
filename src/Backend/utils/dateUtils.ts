export const formatDate = () => {
    const now = new Date();
    return now.toLocaleString('IND', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };