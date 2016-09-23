export default {
    degrees2radians: function(degrees) {
        return degrees * (Math.PI / 180)
    },
    getVectorRectangularCoordinates: function(length, degrees) {
        const radians = this.degrees2radians(degrees);

        return [length * Math.cos(radians), length * Math.sin(radians)];
    },
    getVectorEndPointCoordinates: function(startX, startY, vectorLength, vectorDegrees) {
        const vectorRectangularCoordinates = this.getVectorRectangularCoordinates(vectorLength, vectorDegrees);

        return [
            startX + vectorRectangularCoordinates[0],
            startY + vectorRectangularCoordinates[1]
        ]
    }
}