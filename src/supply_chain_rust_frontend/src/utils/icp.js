import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "declarations/supply_chain_rust_backend/supply_chain_rust_backend.did.js";
import { canisterId } from "declarations/supply_chain_rust_backend";

const agent = new HttpAgent();

// In dev environment, fetch root key for local replica
if (import.meta.env.DEV) {
  agent.fetchRootKey().catch((err) => {
    console.warn("Failed to fetch root key:", err);
  });
}

const supplyChainActor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

export default supplyChainActor;
