import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import VaultDiscovery from "@/pages/vault-discovery";
import ChatVaultPage from "@/pages/chat-vault";
import AccountPage from "@/pages/account";
import MyVaultPage from "@/pages/my-vault";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VaultDiscovery} />
      <Route path="/account" component={AccountPage} />
      <Route path="/my-vault" component={MyVaultPage} />
      <Route path="/:vaultId" component={ChatVaultPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
