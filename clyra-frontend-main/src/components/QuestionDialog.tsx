import { useState } from 'react';

interface QuestionDialogProps {
  question: string | null;
  onSendResponse: (response: string) => boolean;
  onClose: () => void;
}

export default function QuestionDialog({ question, onSendResponse, onClose }: QuestionDialogProps) {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug logging
  console.log('QuestionDialog render - question:', question);
  
  const handleSubmit = async () => {
    if (response.trim() && !isSubmitting) {
      setIsSubmitting(true);
      const success = onSendResponse(response.trim());
      
      if (success) {
        setResponse('');
        onClose();
      }
      
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!question) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40" 
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl z-50 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🏥 Doctor's Question
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 mb-6">
          <div className="flex items-start gap-2">
            <span className="text-blue-600 font-semibold text-sm">Doctor:</span>
            <p className="text-gray-800 leading-relaxed">{question}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Your Response:
          </label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Please describe your symptoms, pain level, duration, or any other relevant details..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
            rows={4}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </span>
            <span className="text-sm text-gray-400">
              {response.length}/500
            </span>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!response.trim() || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" />
                </svg>
                Sending...
              </>
            ) : (
              'Send Response'
            )}
          </button>
        </div>
      </div>
    </>
  );
}