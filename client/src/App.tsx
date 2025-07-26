import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import VaultDiscovery from "@/pages/vault-discovery";
import ChatVaultPage from "@/pages/chat-vault";
import AccountPage from "@/pages/account";
import UserUpdatePage from "@/pages/user-update";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={VaultDiscovery} />
      <Route path="/account" component={AccountPage} />
      <Route path="/user-update" component={UserUpdatePage} />
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
