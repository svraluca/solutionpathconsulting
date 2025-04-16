#!/bin/bash

# Create the portfolio directory if it doesn't exist
mkdir -p public/images/portfolio

# List of required images
echo "Please copy the following images to public/images/portfolio/:"
echo "1. Fetino.ai.png"
echo "2. Acumacum-app.png"
echo "3. Fitness-webiste.png"
echo "4. fitnessapp.jpg"
echo "5. RoActiune-website.png"
echo "6. roactiune-app.png"

# Check if images exist
echo -e "\nMissing images:"
for img in "Fetino.ai.png" "Acumacum-app.png" "Fitness-webiste.png" "fitnessapp.jpg" "RoActiune-website.png" "roactiune-app.png"; do
    if [ ! -f "public/images/portfolio/$img" ]; then
        echo "❌ $img"
    else
        echo "✅ $img"
    fi
done 