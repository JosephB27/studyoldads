import { CurateClient } from "./CurateClient";
import { getCurateCandidates } from "./candidates";

export default function CuratePage() {
  return <CurateClient candidates={getCurateCandidates()} />;
}
