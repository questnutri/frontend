export default interface IAllergies {
    name: string
    severity: "mild" | "moderate" | "severe"
    obs?: string
}
