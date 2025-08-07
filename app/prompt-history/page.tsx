"use client";

import { useUser } from "@/components/UserProvider";
import { db } from "@/lib/firebase";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Prompt = {
  id: string;
  prompt: string;
  type: string;
  category: string;
  generation: string;
  createdAt?: { seconds: number; nanoseconds: number };
};

export default function PromptHistoryPage() {
  const { user } = useUser();
  const promptsRef = user ? collection(db, `users/${user.uid}/prompts`) : null;
  const [promptsSnapshot, loadingPrompts] = useCollection(
    promptsRef ? promptsRef : undefined,
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  const prompts: Prompt[] = promptsSnapshot
    ? promptsSnapshot.docs
        .map((doc) => ({ ...(doc.data() as Prompt), id: doc.id }))
        .sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold text-gradient">
            Your Past Generations
          </h1>
          <Button asChild variant="outline" className="font-body">
            <Link href="/">Back Home</Link>
          </Button>
        </div>
        {loadingPrompts ? (
          <div className="text-muted-foreground font-body">
            Loading your prompts...
          </div>
        ) : prompts.length === 0 ? (
          <div className="text-muted-foreground font-body">
            No prompts yet. Start creating!
          </div>
        ) : (
          <div className="grid gap-4">
            {prompts.map((p) => (
              <Card key={p.id} className="bg-card/70 border-border/30">
                <CardContent className="p-4 space-y-2">
                  <div className="flex flex-wrap gap-2 items-center text-xs font-body">
                    <Badge>{p.type}</Badge>
                    <Badge variant="secondary">{p.category}</Badge>
                    <span className="text-muted-foreground ml-auto">
                      {p.createdAt?.seconds
                        ? new Date(p.createdAt.seconds * 1000).toLocaleString()
                        : ""}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Prompt:</span> {p.prompt}
                  </div>
                  <div>
                    <span className="font-semibold">Result:</span>
                    <div className="bg-muted/30 rounded p-2 mt-1 whitespace-pre-wrap font-body text-sm">
                      {p.generation}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
