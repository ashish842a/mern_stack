  export const fetchPredictedAge = async (name,setFormData) => {
    try {
      const res = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
      const data = await res.json();
      if (data.age) {
        console.log(`Predicted age for ${name}:`, data.age);
        
        setFormData((prev) => ({ ...prev, predictedAge: data.age.toString() }));
      } else {
        setFormData((prev) => ({ ...prev, predictedAge: '' }));
      }
    } catch (err) {
      setFormData((prev) => ({ ...prev, predictedAge: '' }));
    }
  };