export default interface IAllergy {
    _id?: string
    name: string
    severity: "mild" | "moderate" | "severe"
    obs?: string
}
