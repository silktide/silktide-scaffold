/** Example dashboard — demonstrates data fetching, tables, and loading states. */

"use client";

import { useApi } from "@/hooks/useApi";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import type { PaginatedResponse, User } from "@/types";

export default function DashboardPage() {
  const { data, loading, error } = useApi<PaginatedResponse<User>>("/api/users");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your application data."
        action={<Button>Create User</Button>}
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Total Users</p>
            <p className="mt-1 text-3xl font-bold text-neutral-900 dark:text-white">
              {data?.meta.total ?? "\u2014"}
            </p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Status</p>
            <p className="mt-1 text-3xl font-bold text-success">Active</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">API Health</p>
            <p className="mt-1 text-3xl font-bold text-neutral-900 dark:text-primary-400">OK</p>
          </Card.Body>
        </Card>
      </div>

      <Card className="mt-8">
        <Card.Header>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Users</h2>
        </Card.Header>
        <Card.Body className="p-0">
          {loading && <LoadingSpinner />}
          {error && (
            <div className="p-6 text-center text-sm text-danger">
              Failed to load users: {error}
            </div>
          )}
          {!loading && !error && data && data.data.length === 0 && (
            <EmptyState
              title="No users yet"
              message="Create your first user to see them listed here."
              action={<Button>Create User</Button>}
            />
          )}
          {!loading && !error && data && data.data.length > 0 && (
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.Header>Name</Table.Header>
                  <Table.Header>Email</Table.Header>
                  <Table.Header>Role</Table.Header>
                  <Table.Header>Created</Table.Header>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {data.data.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell className="font-medium text-neutral-900 dark:text-white">
                      {user.name}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      <Badge variant={user.role === "ADMIN" ? "default" : "outline"}>
                        {user.role}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
