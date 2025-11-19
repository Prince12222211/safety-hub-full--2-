import Assessment from "../models/Assessment.js";
import Module from "../models/Module.js";

export const ensureEarthquakeAssessment = async () => {
  try {
    const existing = await Assessment.findOne({ title: "Earthquake Awareness Quiz" });
    if (existing) {
      console.log("Earthquake assessment already exists.");
      return;
    }

    // Ensure a Module exists for earthquake content
    let module = await Module.findOne({ category: "earthquake" });
    if (!module) {
      module = await Module.create({
        title: "Earthquake Awareness",
        description: "Core concepts and preparedness for earthquake safety.",
        category: "earthquake",
        difficulty: "beginner",
        duration: 20,
        content: [
          { type: "quiz", title: "Earthquake Awareness Quiz", data: "" }
        ]
      });
      console.log("Created earthquake module for assessments.");
    }

    const questions = [
      {
        question: "What should you do immediately when you feel an earthquake?",
        type: "multiple-choice",
        options: [
          "Run outside the building",
          "Drop, Cover, and Hold On (take cover under a sturdy desk or table)",
          "Get in the bathtub",
          "Stand in the doorway"
        ],
        correctAnswer: "Drop, Cover, and Hold On (take cover under a sturdy desk or table)",
        explanation: "The 'Drop, Cover, and Hold On' technique protects you from falling debris. Avoid running outside as falling objects are more dangerous outdoors."
      },
      {
        question: "How long should you remain in a 'Drop, Cover, Hold On' position?",
        type: "multiple-choice",
        options: ["10 seconds", "Until you stop feeling shaking (usually 30-60 seconds)", "5 minutes", "As soon as possible"],
        correctAnswer: "Until you stop feeling shaking (usually 30-60 seconds)",
        explanation: "Most earthquakes last 5-30 seconds, but strong shaking may continue for longer. Stay protected until all shaking has completely stopped."
      },
      {
        question: "What is the 'safe triangle' concept in earthquake safety?",
        type: "multiple-choice",
        options: [
          "A triangular shelter built outside homes",
          "The triangular void that forms next to a dropped object when a building collapses",
          "A warning symbol for earthquakes",
          "A triangle marking on emergency exits"
        ],
        correctAnswer: "The triangular void that forms next to a dropped object when a building collapses",
        explanation: "The safe triangle concept suggests seeking shelter next to large, sturdy objects that won't collapse completely, as these create protective spaces."
      },
      {
        question: "What should you NOT do during an earthquake?",
        type: "multiple-choice",
        options: ["Use the elevator", "Run outside the building", "Turn off gas if you smell it after the earthquake", "All of the above"],
        correctAnswer: "All of the above",
        explanation: "All three are things you should NOT do. Elevators can trap you, running outside exposes you to falling debris, and only turn off gas if you smell it."
      },
      {
        question: "What is the primary purpose of an earthquake Early Warning System?",
        type: "multiple-choice",
        options: ["To predict earthquakes days in advance", "To detect earthquakes and send alerts in the first few seconds", "To stop earthquakes from happening", "To measure earthquake severity"],
        correctAnswer: "To detect earthquakes and send alerts in the first few seconds",
        explanation: "Early Warning Systems detect earthquakes that are already happening and send alerts within seconds, giving people time to take protective action."
      },
      {
        question: "After an earthquake, when should you leave your building?",
        type: "multiple-choice",
        options: ["Immediately after shaking stops", "After checking for injuries, gas leaks, and structural damage", "Only if ordered to evacuate", "After calling emergency services"],
        correctAnswer: "After checking for injuries, gas leaks, and structural damage",
        explanation: "Check for injuries and hazards first, ensure the building is safe, and only leave if necessary. Move carefully to avoid injured persons and debris."
      },
      {
        question: "What should be included in an earthquake emergency kit?",
        type: "multiple-choice",
        options: ["Only flashlight and water", "First aid kit, water, flashlight, batteries, food, medications, whistle, and documents", "Just a map", "Nothing - it's not necessary"],
        correctAnswer: "First aid kit, water, flashlight, batteries, food, medications, whistle, and documents",
        explanation: "A comprehensive emergency kit should include water (1 gallon/person/day), food, first aid, medications, important documents, flashlight, batteries, whistle, and sturdy shoes."
      },
      {
        question: "On a scale of Richter scale, what magnitude earthquake is generally considered major?",
        type: "multiple-choice",
        options: ["Below 3.0", "3.0 - 4.9", "5.0 - 5.9", "7.0 and above"],
        correctAnswer: "7.0 and above",
        explanation: "Earthquakes of magnitude 7.0 or higher are considered major or great earthquakes. Magnitude 6.0-6.9 are strong, 5.0-5.9 are moderate."
      },
      {
        question: "What should you do if trapped under rubble after an earthquake?",
        type: "multiple-choice",
        options: ["Shout continuously", "Try to move large debris", "Stay calm, tap on pipes/walls to signal, and preserve breathing space", "Panic to attract attention"],
        correctAnswer: "Stay calm, tap on pipes/walls to signal, and preserve breathing space",
        explanation: "If trapped, stay calm, ration your energy, tap on pipes/walls in patterns, create and maintain breathing space, and only shout when you hear rescuers."
      },
      {
        question: "Which area is typically the safest during an earthquake at home?",
        type: "multiple-choice",
        options: ["Window areas", "Under a sturdy table, against interior walls, or in corners", "Near the front door", "On the roof"],
        correctAnswer: "Under a sturdy table, against interior walls, or in corners",
        explanation: "Interior walls, under sturdy furniture, and corners provide the most protection from falling debris and structural collapse. Avoid windows and exterior walls."
      }
    ];

    await Assessment.create({
      title: "Earthquake Awareness Quiz",
      module: module._id,
      description: "A short quiz to test earthquake preparedness knowledge.",
      questions,
      passingScore: 70,
      timeLimit: 15,
      difficulty: "beginner",
      isActive: true
    });

    console.log("Seeded Earthquake Awareness assessment.");
  } catch (error) {
    console.error("Failed to seed earthquake assessment:", error.message);
  }
};

export default ensureEarthquakeAssessment;
