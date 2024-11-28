export default interface IAllergy {
    name: string
    severity: "mild" | "moderate" | "severe"
    obs?: string
}
